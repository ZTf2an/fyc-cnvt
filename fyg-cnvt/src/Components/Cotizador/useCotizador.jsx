import { useEffect, useState } from "react";
import {
  calcularValor,
  extraerValorVirSegunPredios,
  extraerVAlorPreSegunPredios,
  extraerValorPCRSegunPredios,
  extraerValorMSegunPredios,
  extraerValorQRSegunPredios,
  calcularEquiposAdicionales,
  calcularLogisticos,
} from "../../Utils/calcularValor";

export const useCotizador = () => {
  // Descuento e incremento
  const [descuentoIsChecked, setDescuentoIsChecked] = useState(false);
  const [incrementoIsChecked, setIncrementoIsChecked] = useState(false);
  const [descuentoCoef, setDescuentoCoef] = useState(0);
  const [incrementoCoef, setIncrementoCoef] = useState(0);

  // Valores por defecto
  const [defaultValorVirtual, setDefaultValorVirtual] = useState(0);
  const [defaultValorTarjetas, setDefaultValorTarjetas] = useState(0);
  const [defaultValorControles, setDefaultValorControles] = useState(0);
  const [defaultValorQR, setDefaultValorQR] = useState(0);
  const [defaultValorMixta, setDefaultValorMixta] = useState(0);

  const [valoresAdicionales, setValoresAdicionales] = useState({
    valorExtraVirtual: 750000,
    valorExtraMixta: 800000,
    numeroControles : 0,
    valorExtraControles: 0,
    valorTransporte: 80000,
    valorExtraEquipos: 0,
  });

  const [numeroPredios, setNumeroPredios] = useState(0);
  const [valorControles, setValorControles] = useState(5);

  // Servicios Adicionales
  const [serviciosAdicionales, setServiciosAdicionales] = useState({
    acta: { isRequired: true },
    filmacion: { isRequired: true },
    votacion: { isRequired: true, logisticos: 2 },
    sonido: { isRequired: true, cabinas: 2, microfonos: 3, patinadores: 1 },
    proyeccion: { isRequired: true, videobeam: 1, telon: 1 },
    cctv: { isRequired: false, salones: 2 },
  });

  // Cambios
  const [changes, setChanges] = useState(true);
  const [changesAllowed, setChangesAllowed] = useState(false);

  // 👉 Manejo de descuento/incremento
  useEffect(() => {
    if (descuentoIsChecked) {
      setIncrementoIsChecked(false);
      setDescuentoCoef(10);
      setIncrementoCoef(0);
    } else {
      setDescuentoCoef(0);
    }

    if (incrementoIsChecked) {
      setDescuentoIsChecked(false);
      setIncrementoCoef(10);
      setDescuentoCoef(0);
    } else {
      setIncrementoCoef(0);
    }
  }, [descuentoIsChecked, incrementoIsChecked]);

  // 👉 Recalcular valores cuando cambian predios o coeficientes
  useEffect(() => {
    if (!changes) return;

    setDefaultValorVirtual(
      calcularValor(
        extraerValorVirSegunPredios(numeroPredios),
        [0],
        descuentoCoef,
        incrementoCoef
      )
    );

    setDefaultValorTarjetas(
      calcularValor(
        extraerVAlorPreSegunPredios(numeroPredios),
        [valoresAdicionales.valorTransporte, valoresAdicionales.valorExtraEquipos],
        descuentoCoef,
        incrementoCoef
      )
    );

    setDefaultValorControles(
      calcularValor(
        extraerValorPCRSegunPredios(
          extraerVAlorPreSegunPredios(numeroPredios),
          valoresAdicionales.numeroControles
        ),
        [
          valoresAdicionales.valorTransporte,
          valoresAdicionales.valorExtraEquipos,
        ],
        descuentoCoef,
        incrementoCoef
      )
    );

    setDefaultValorQR(
      calcularValor(
        extraerValorQRSegunPredios(
          numeroPredios,
          extraerVAlorPreSegunPredios(numeroPredios)
        ),
        [valoresAdicionales.valorTransporte, valoresAdicionales.valorExtraEquipos],
        descuentoCoef,
        incrementoCoef
      )
    );

    setDefaultValorMixta(
      calcularValor(
        extraerValorMSegunPredios(
          extraerVAlorPreSegunPredios(numeroPredios),
          numeroPredios
        ),
        [valoresAdicionales.valorExtraEquipos, valoresAdicionales.valorTransporte],
        descuentoCoef,
        incrementoCoef
      )
    );
  }, [
    changes,
    numeroPredios,
    descuentoCoef,
    incrementoCoef,
    valoresAdicionales.numeroControles,
    valoresAdicionales.valorTransporte,
    valoresAdicionales.valorExtraControles,
    valoresAdicionales.valorExtraEquipos,
  ]);

  // 👉 Actualizar servicios y equipos adicionales
    useEffect(() => {
        const extraPorEquipos = calcularEquiposAdicionales(
        serviciosAdicionales.sonido.cabinas,
        serviciosAdicionales.proyeccion.videobeam,
        1,
        serviciosAdicionales.votacion.logisticos,
        numeroPredios
        );

        // Solo actualizar si cambió
        if (valoresAdicionales.valorExtraEquipos !== extraPorEquipos) {
        setValoresAdicionales((prev) => ({
            ...prev,
            valorExtraEquipos: extraPorEquipos,
        }));
        }

    }, [numeroPredios, serviciosAdicionales.sonido.cabinas, serviciosAdicionales.proyeccion.videobeam , serviciosAdicionales.votacion.logisticos]);

    // efecto que recalcula logisticos SOLO cuando cambia numeroPredios
    useEffect(() => {
    const nuevoLogisticos = calcularLogisticos(numeroPredios);

    setServiciosAdicionales((prev) => {
        // solo actualiza si cambió
        if (prev.votacion.logisticos !== nuevoLogisticos) {
        return {
            ...prev,
            votacion: { ...prev.votacion, logisticos: nuevoLogisticos },
        };
        }
        return prev;
      });
    
    setValoresAdicionales({...valoresAdicionales , numeroControles : parseInt(numeroPredios)});
    }, [numeroPredios]);

  // 👉 Función auxiliar
  const calcularValorControles = (ip) => {
    const controles = isNaN(ip) ? 0 : ip;
    return parseInt(controles) * 8500;
  };

  return {
    descuentoIsChecked,
    setDescuentoIsChecked,
    incrementoIsChecked,
    setIncrementoIsChecked,
    defaultValorVirtual,
    setDefaultValorVirtual,
    defaultValorTarjetas,
    setDefaultValorTarjetas,
    defaultValorControles,
    setDefaultValorControles,
    defaultValorQR,
    setDefaultValorQR,
    defaultValorMixta,
    setDefaultValorMixta,
    numeroPredios,
    setNumeroPredios,
    incrementoCoef,
    setIncrementoCoef,
    descuentoCoef,
    setDescuentoCoef,
    valorControles,
    setValorControles,
    valoresAdicionales,
    setValoresAdicionales,
    serviciosAdicionales,
    setServiciosAdicionales,
    changes,
    setChanges,
  };
};