type Props = {
  fieldError?: string[];
  fieldName: string;
};

const FormFieldError = ({ fieldError: error, fieldName }: Props) => {
  return error && error?.length !== 0 ? (
    <ul id={`${fieldName}-error`} role='alert' class='ml-2 pt-2'>
      {error.map((err) => (
        <li class='ml-4 list-disc text-xs text-red-600'>{err}</li>
      ))}
    </ul>
  ) : (
    <></>
  );
};

export default FormFieldError;
