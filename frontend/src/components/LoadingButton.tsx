import React from "react";

interface LoadingButtonProps {
  loading: boolean;
  children: React.ReactNode;
  disabled?: boolean;
  [type: string]: any;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  loading,
  children,
  disabled,
  ...props
}) => {
  return (
    <button
      className="btn btn-primary w-100"
      disabled={loading || disabled}
      {...props}
    >
      {loading ? (
        <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
      ) : (
        children
      )}
    </button>
  );
};

export default LoadingButton;
