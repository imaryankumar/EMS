export interface AuthState {
  isLoggedIn: boolean;
}

export interface CompanyAuth {
  isLoading: boolean;
  isError: any;
  companyId: any;
}

export interface UserDetails {
  isLoading: boolean;
  isError: any;
  userDetails: any;
  getAllProfiles: any;
}
