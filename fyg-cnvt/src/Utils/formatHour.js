export default function formatHour (string) {
    if (!string) return "";

    const fecha = new Date(string);

    // Formatear a HH:mm (24 horas)
    const hora = fecha.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
    });

    return hora
}