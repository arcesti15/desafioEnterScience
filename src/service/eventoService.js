import api from "./api.js"

export default class EventoService {
    async createEvent(event) {
        const res = await api.post("/events", event).catch((error) => {
            return error.response.data;
        });
        return res;
    }

    async getEvent() {
        const res = await api.get("/events").catch((error) => {
            return error.response;
        });
        return res.data;
    }

    async deleteEvent(id) {
        const res = await api.delete("/events/" + id).catch((error) => {
            return error.response;
        })
        return res;
    }

}