import http from "../http-common";

class ServiceDataService {
  getAll(params) {
    return http.get("/services", { params });
  }

  get(id) {
    return http.get(`/services/${id}`);
  }

  create(data) {
    return http.post("/services", data);
  }

  update(id, data) {
    return http.put(`/services/${id}`, data);
  }

  delete(id) {
    return http.delete(`/services/${id}`);
  }

  deleteAll() {
    return http.delete(`/services`);
  }

  findBySurname(surname) {
    return http.get(`/services?surname=${surname}`);
  }

  findObservations(id) {
    return http.get(`/services/${id}/obs`);
  }

  deleteObservation(id, observation) {
    return http.delete(`/services/${id}/obs?observation=${observation}`);
  }

  addObservation(id, data) {
    return http.put(`/services/${id}/addob`, data);
  }
}

export default new ServiceDataService();
