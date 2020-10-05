import http from "../http-common";

class PatientDataService {
  getAll(params) {
    return http.get("/patients", { params });
  }

  get(id) {
    return http.get(`/patients/${id}`);
  }

  create(data) {
    return http.post("/patients", data);
  }

  update(id, data) {
    return http.put(`/patients/${id}`, data);
  }

  delete(id) {
    return http.delete(`/patients/${id}`);
  }

  deleteAll() {
    return http.delete(`/patients`);
  }

  findBySurname(surname) {
    return http.get(`/patients?surname=${surname}`);
  }

  findObservations(id) {
    return http.get(`/patients/${id}/obs`);
  }

  deleteObservation(id, observation) {
    return http.delete(`/patients/${id}/obs?observation=${observation}`);
  }

  addObservation(id, data) {
    return http.put(`/patients/${id}/addob`, data);
  }
}

export default new PatientDataService();
