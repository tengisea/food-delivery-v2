import { UserContextProvider } from "@/providers/UserProvider";

export const layout = () => {
  return (
    <UserContextProvider>
      <div>layout</div>
    </UserContextProvider>
  );
};
