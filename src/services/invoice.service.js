import http from "../http-common";

class InvoiceDataService {
  getAll(params) {
    return http.get("/invoices", { params });
  }

  get(id) {
    return http.get(`/invoices/${id}`);
  }

  create(data) {
    return http.post("/invoices", data);
  }

  update(id, data) {
    return http.put(`/invoices/${id}`, data);
  }

  delete(id) {
    return http.delete(`/invoices/${id}`);
  }

  deleteAll() {
    return http.delete(`/invoices`);
  }

  findBySurname(surname) {
    return http.get(`/invoices?surname=${surname}`);
  }

  findByPatientId(id) {
    return http.get(`/invoices/patient/${id}`);
  }

  findByDate(date) {
    return http.get(`/invoices/scheduled?date=${date}`);
  }

  findByDateNext(date) {
    return http.get(`/invoices/scheduled/next?date=${date}`);
  }
}

export default new InvoiceDataService();
