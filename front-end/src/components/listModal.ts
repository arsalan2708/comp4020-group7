import { mountModalContainer } from "./modalContainer.js";

export enum ListModalMode {
  Create,
  Edit,
}

interface ListModalProps {
  mode: ListModalMode;
}

export function mountListModal({ mode }: ListModalProps) {
  const modal = mountModalContainer({});

  return modal;
}
