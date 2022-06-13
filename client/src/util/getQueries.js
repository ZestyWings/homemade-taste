import { useMutation } from "@apollo/client";
import { ADD_MENU, REMOVE_MENU, UPDATE_USER } from "../util/queries";

export function useUpdateUser() {
  const [updateUser] = useMutation(UPDATE_USER);
  const putUser = async (user) => {
    try {
      if (!user) {
        throw new Error("Invalid!");
      }
      return await updateUser({ variables: { ...user } });
    } catch (error) {
      console.log(error);
    }
  };
  return putUser;
}

export function useMenu() {
  const [addMenu] = useMutation(ADD_MENU);
  const [removeMenu] = useMutation(REMOVE_MENU);
  const add = async (name) => {
    try {
      if (!name) {
        throw new Error("Invalid menu");
      }
      return await addMenu({ variables: { name } });
    } catch (error) {
      console.log(error);
    }
  };
  const remove = async (menuId) => {
    try {
      if (!menuId) {
        throw new Error("Invalid menu");
      }
      return await removeMenu({ variables: { menuId } });
    } catch (error) {
      console.log(error);
    }
  };
  return { add, remove };
}
