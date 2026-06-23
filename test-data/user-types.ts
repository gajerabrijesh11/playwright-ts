export interface ValidUser {
  email: string;
  password: string;
  Invalidemail: string;
  Invalidpassword: string;
}
export interface CategoryData {
  category: string;
  expectedcard: string;
  expectedcard1?: string;
}
export interface CombineDropdownSelectionData {
  scenario: string;
  category: string;
  city: string;
  expectedcard: string;
}
export interface DDTLoginData {
  scenario: string;
  email: string;
  password: string;
}
export interface SearchEventsData {
  scenario: string;
  keyword: string;
  expectedCard: string;
}
export interface UserDataJson {
  validUser: ValidUser;
  Categorydropdown: CategoryData[];
  Combinedropdownselection: CombineDropdownSelectionData[];
  DDTLogindata: DDTLoginData[];
  SearchEvents: SearchEventsData[];
}