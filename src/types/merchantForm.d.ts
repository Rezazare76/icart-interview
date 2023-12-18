export default interface MerchantForm {
  name: string;
  city?: string;
  RequesterNationalCode: string;
  SignatorPosition: string;
  number: string;
  postalCode: string;
  tel: string;
  address: string;
  fieldOfWork: string;
  signatoryName: string;
  provinceId?: string;
  geo: string;
}
