import http from "../http-common";

class AppointmentDataService {
  getAll(params) {
    return http.get("/appointments", { params });
  }

  get(id) {
    return http.get(`/appointments/${id}`);
  }

  create(data) {
    return http.post("/appointments", data);
  }

  update(id, data) {
    return http.put(`/appointments/${id}`, data);
  }

  delete(id) {
    return http.delete(`/appointments/${id}`);
  }

  deleteAll() {
    return http.delete(`/appointments`);
  }

  findBySurname(surname) {
    return http.get(`/appointments?surname=${surname}`);
  }

  findByPatientId(id) {
    return http.get(`/appointments/patient/${id}`);
  }

  findByDate(date) {
    return http.get(`/appointments/scheduled?date=${date}`);
  }

  findByDateNext(date) {
    return http.get(`/appointments/scheduled/next?date=${date}`);
  }
}

export default new AppointmentDataService();
