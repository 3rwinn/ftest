import React from "react";
import { useFormikContext } from "formik";
import Button from "../common/Button";

function SubmitButton({
  isFull = false,
  loading = false,
  children,
  ...otherProps
}) {
  const { submitForm } = useFormikContext();

  return (
    <Button loading={loading} full={isFull} type="submit" event={submitForm} {...otherProps}>
      {children}
    </Button>
  );
}

export default SubmitButton;
