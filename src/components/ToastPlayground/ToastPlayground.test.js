import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import ToastPlayground from "./ToastPlayground";
import ToastsProvider from "../../providers/ToastsProvider";

const crypto = require("crypto").webcrypto;
global.crypto = crypto;

const getUser = () => {
  return userEvent.setup();
};

const setup = () => {
  render(<ToastPlayground />, { wrapper: ToastsProvider });
};

describe("toasts playground", () => {
  beforeEach(() => setup());

  it("initial render is correct", () => {
    expect(screen.getByText(/toast playground/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/notice/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/notice/i)).toBeChecked();
    expect(screen.getByLabelText(/warning/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/success/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/error/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /pop toast!/i })
    ).toBeInTheDocument();
  });

  it("can create toast of notice variant", async () => {
    const message = "hi this is a sweet notice";
    const user = getUser();

    await user.type(screen.getByLabelText(/message/i), message);
    await user.click(screen.getByRole("button", { name: /pop toast!/i }));

    expect(screen.getByLabelText(/message/i)).toHaveTextContent("");
    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it("can create toast of success variant", async () => {
    const message = "save success";
    const user = getUser();

    await user.type(screen.getByLabelText(/message/i), message);
    await user.click(screen.getByLabelText(/success/i));
    await user.click(screen.getByRole("button", { name: /pop toast!/i }));

    expect(screen.getByLabelText(/notice/i)).toBeChecked();
    expect(screen.getByLabelText(/success/i)).not.toBeChecked();
    expect(screen.getByLabelText(/message/i)).toHaveTextContent("");
    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it("can stack multiple toasts", async () => {
    const error = "error occurred";
    const success = "save success";
    const warning = "this is a warm warning";
    const user = getUser();

    await user.click(screen.getByLabelText(/error/i));
    await user.type(screen.getByLabelText(/message/i), error);
    await user.click(screen.getByRole("button", { name: /pop toast!/i }));

    await user.click(screen.getByLabelText(/success/i));
    await user.type(screen.getByLabelText(/message/i), success);
    await user.click(screen.getByRole("button", { name: /pop toast!/i }));

    await user.click(screen.getByLabelText(/warning/i));
    await user.type(screen.getByLabelText(/message/i), warning);
    await user.click(screen.getByRole("button", { name: /pop toast!/i }));

    expect(screen.getByLabelText(/message/i)).toHaveTextContent("");
    expect(screen.getByText(error)).toBeInTheDocument();
    expect(screen.getByText(success)).toBeInTheDocument();
    expect(screen.getByText(warning)).toBeInTheDocument();
  });

  it("can remove toast", async () => {
    const error = "error occurred";
    const success = "save success";
    const warning = "this is a warm warning";
    const user = getUser();

    await user.click(screen.getByLabelText(/error/i));
    await user.type(screen.getByLabelText(/message/i), error);
    await user.click(screen.getByRole("button", { name: /pop toast!/i }));

    await user.click(screen.getByLabelText(/success/i));
    await user.type(screen.getByLabelText(/message/i), success);
    await user.click(screen.getByRole("button", { name: /pop toast!/i }));

    await user.click(screen.getByTestId("remove-toast-success"));

    expect(screen.getByLabelText(/message/i)).toHaveTextContent("");
    expect(screen.getByText(error)).toBeInTheDocument();
    expect(screen.queryByText(success)).not.toBeInTheDocument();
  });

  it("can remove all toasts pressing Escape key", async () => {
    const error = "error occurred";
    const success = "save success";
    const warning = "this is a warm warning";
    const user = getUser();

    await user.click(screen.getByLabelText(/error/i));
    await user.type(screen.getByLabelText(/message/i), error);
    await user.click(screen.getByRole("button", { name: /pop toast!/i }));

    await user.click(screen.getByLabelText(/success/i));
    await user.type(screen.getByLabelText(/message/i), success);
    await user.click(screen.getByRole("button", { name: /pop toast!/i }));

    await user.click(screen.getByLabelText(/warning/i));
    await user.type(screen.getByLabelText(/message/i), warning);
    await user.click(screen.getByRole("button", { name: /pop toast!/i }));

    await user.keyboard("{escape}");

    expect(screen.getByLabelText(/message/i)).toHaveTextContent("");
    expect(screen.queryByText(error)).not.toBeInTheDocument();
    expect(screen.queryByText(success)).not.toBeInTheDocument();
    expect(screen.queryByText(warning)).not.toBeInTheDocument();
  });
});
