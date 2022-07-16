import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {},
});

interface IAppReduxProviderProps {
  children: React.ReactNode;
}

export const AppReduxProvider: React.FC<IAppReduxProviderProps> = ({
  children,
}) => {
  return <Provider store={store}>{children}</Provider>;
};
