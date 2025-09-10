export const Button = ({ as: As = "button", className="", ...props }) => (
  <As className={`px-4 py-2 rounded-2xl shadow ${className}`} {...props} />
);