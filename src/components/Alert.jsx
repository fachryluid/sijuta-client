import { Alert } from 'flowbite-react';
import { HiInformationCircle } from 'react-icons/hi';

const AlertComponent = ({ color, onDismiss, alertMessage, className }) => {
  return (
    <>
      <Alert
        color={color}
        onDismiss={onDismiss}
        icon={HiInformationCircle}
        className={className}
      >
        <span>
          <p>
            {alertMessage}
          </p>
        </span>
      </Alert>
    </>
  )
}

export default AlertComponent