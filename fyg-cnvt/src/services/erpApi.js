import { API_ERP, API_ERP_KEY } from '../Globals/API';

const MAX_THIRD_PARTY_PAGES = 100;
const REQUEST_TIMEOUT_MS = 10000;

export class ErpApiError extends Error {
    constructor(message, status) {
        super(message);
        this.name = 'ErpApiError';
        this.status = status;
    }
}

export function normalizeErpDocument(value) {
    const document = String(value ?? '').trim().replace(/\s|\./g, '');
    return document.split('-')[0].replace(/\D/g, '');
}

function getThirdPartyDocument(thirdParty) {
    return normalizeErpDocument(thirdParty?.identificacion);
}

async function requestErp(path, options = {}) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
        const response = await fetch(`${API_ERP}${path}`, {
            ...options,
            signal: controller.signal,
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${API_ERP_KEY}`,
                ...(options.body ? { 'Content-Type': 'application/json' } : {}),
                ...options.headers
            }
        });

        const text = await response.text();
        let payload = {};
        if (text) {
            try {
                payload = JSON.parse(text);
            } catch {
                payload = { message: text };
            }
        }

        if (!response.ok) {
            throw new ErpApiError(
                payload.message || `El ERP respondió con el código ${response.status}.`,
                response.status
            );
        }

        return payload;
    } catch (error) {
        if (error instanceof ErpApiError) {
            throw error;
        }

        if (error.name === 'AbortError') {
            throw new ErpApiError('El ERP no respondió a tiempo.');
        }

        throw new ErpApiError('No se pudo establecer conexión con el ERP.');
    } finally {
        clearTimeout(timeout);
    }
}

export async function fetchErpThirdParties() {
    const thirdParties = [];
    let pages = 1;

    for (let page = 1; page <= pages; page += 1) {
        const query = new URLSearchParams({
            por_pagina: '100',
            page: String(page)
        });
        const response = await requestErp(`/terceros?${query}`);

        if (!Array.isArray(response.data)) {
            throw new ErpApiError('El ERP devolvió una lista de terceros inválida.');
        }

        thirdParties.push(...response.data);
        pages = Math.max(1, Number(response.paginas) || 1);
        if (pages > MAX_THIRD_PARTY_PAGES) {
            throw new ErpApiError('La lista de terceros del ERP excede el límite de páginas permitido.');
        }
    }

    return thirdParties;
}

export function hasErpThirdParty(thirdParties, documentNumber) {
    const document = normalizeErpDocument(documentNumber);
    return Boolean(document) && thirdParties.some(
        thirdParty => getThirdPartyDocument(thirdParty) === document
    );
}

export async function createErpThirdParty(client) {
    const identification = normalizeErpDocument(client.nit);
    const companyName = String(client.cliente ?? '').trim();

    if (!identification) {
        throw new Error('Ingresa un NIT válido antes de sincronizar con el ERP.');
    }

    if (!companyName) {
        throw new Error('El nombre del cliente es obligatorio para sincronizar con el ERP.');
    }

    const thirdParty = {
        tipo_persona: 'juridica',
        tipo_identificacion: '31',
        identificacion: identification,
        razon_social: companyName,
        roles: ['cliente']
    };
    const email = String(client.email ?? '').trim();
    if (email) {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            throw new Error('El correo del cliente no tiene un formato válido.');
        }
        thirdParty.correo = email;
    }

    const phone = String(client.tel ?? '').trim();
    if (phone) {
        thirdParty.telefono = phone;
    }

    const address = String(client.direccion ?? '').trim();
    if (address) {
        thirdParty.direccion = address;
    }

    const response = await requestErp('/terceros', {
        method: 'POST',
        body: JSON.stringify(thirdParty)
    });

    return response.data ?? response;
}
