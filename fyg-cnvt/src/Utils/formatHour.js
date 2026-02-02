export default function formatHour (string , is12Hour = true) {
    if (!string) return "";
    if (!(string.endsWith("Z"))) return string

    const fecha = new Date(string);

    // Formatear a HH:mm (24 horas)
    const hora = fecha.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: is12Hour
    });

    return hora
}