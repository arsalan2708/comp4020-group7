/**
 * creates an Input with a label associated with it
 * @param id id for input and htmlFor
 * @param label label to display
 * @param name name for input
 * @param type input type
 * @returns "{labelNode, inputNode}"
 */
export function createInput({
  id,
  label,
  name,
  type,
}: {
  id: string;
  label: string;
  name?: string;
  type?: string;
}) {
  //   label for input
  const labelNode = document.createElement("label");
  labelNode.innerText = label;
  labelNode.htmlFor = id;
  labelNode.classList.add("input__label");

  //   input for list label
  const inputNode = document.createElement("input");
  inputNode.id = id;
  name && (inputNode.name = name);
  inputNode.classList.add("input");
  type && (inputNode.type = type);

  const container = document.createElement("div");
  container.classList.add("input__container", "display-col");
  container.append(labelNode, inputNode);

  return { labelNode, inputNode, container };
}
