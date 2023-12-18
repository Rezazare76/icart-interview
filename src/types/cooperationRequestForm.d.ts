export default interface CooperationRequestForm {
  name: "string";
  tel: "string";
  requester_name: "string";
  type: "AGENT" | "ORGANIZATION" | "MERCHANT";
  field_of_work: EnFieldOfWorks;
  employee_count: number;
}
