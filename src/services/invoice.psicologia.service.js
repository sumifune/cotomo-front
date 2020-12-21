import http from "../http-common";
import dd from "../download";

class InvoiceDataService {
  getAll(params) {
    return http.get("/invoicesp", { params });
  }

  generateExcel(params) {
    return http.get("/invoicesp/genexcel", { params });
  }

  downloadExcel() {
    return dd.get("/invoicesp/downloadexcel");
  }

  get(id) {
    return http.get(`/invoicesp/${id}`);
  }

  create(data) {
    return http.post("/invoicesp", data);
  }

  update(id, data) {
    return http.put(`/invoicesp/${id}`, data);
  }

  delete(id) {
    return http.delete(`/invoicesp/${id}`);
  }

  deleteAll() {
    return http.delete(`/invoicesp`);
  }

  findBySurname(surname) {
    return http.get(`/invoicesp?surname=${surname}`);
  }

  findByPatientId(id) {
    return http.get(`/invoicesp/patient/${id}`);
  }

  findByDate(date) {
    return http.get(`/invoicesp/scheduled?date=${date}`);
  }

  findByDateNext(date) {
    return http.get(`/invoicesp/scheduled/next?date=${date}`);
  }
}

export default new InvoiceDataService();
