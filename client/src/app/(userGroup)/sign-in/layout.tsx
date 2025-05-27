import { UserContextProvider } from "@/providers/UserProvider";
import { SignInPage} from "@/app/(userGroup)/sign-in/page";

export const SignInlayout = () => {
  return (
    <UserContextProvider>
      <SignInPage />
    </UserContextProvider>
  );
};

export default SignInlayout;