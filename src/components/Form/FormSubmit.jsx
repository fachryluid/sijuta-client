import { Button } from 'flowbite-react';

export default function FormButton({ isSubmitting, label, type }) {
  return (
    <Button
      className="bg-main-0 font-bold" size="sm"
      type={type ?? 'submit'}
      isProcessing={isSubmitting}
      disabled={isSubmitting}
    >
      {label ?? 'Submit'}
    </Button>
  );
}
