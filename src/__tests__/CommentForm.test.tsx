import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CommentForm } from "../shared/components";

describe("CommentForm component", () => {
  describe("after renders", () => {
    it("should renders correctly", () => {
      const handleComment = jest.fn();
      const { getByRole, debug } = render(
        <CommentForm handleComment={handleComment} />
      );

      const button = screen.getByRole("button", { name: /Enviar/i });

      expect(button).toBeInTheDocument();

      expect(button).toHaveTextContent("Enviar");
      debug();
      userEvent.click(button);
      debug();
      expect(handleComment).toHaveBeenCalled();
    });
  });
});
