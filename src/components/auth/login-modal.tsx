import ModalWrapper from "../common/modal-wrapper";
import { LoginForm } from "./login-form";


export function LoginModal({isOpen, setIsOpen}:{isOpen:boolean, setIsOpen: () =>void})
{
  return (
<ModalWrapper isOpen={isOpen} setIsOpen={setIsOpen}>
  <LoginForm/>
</ModalWrapper>

  );
}
