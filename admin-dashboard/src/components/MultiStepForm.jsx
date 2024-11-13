import React, { useState } from 'react';
import Step1TermsOfService from './Step1TermsOfService';
import Step2AccountHolderDetails from './Step2AccountHolderDetails';
import Step3SelectService from './Step3SelectService';
import Step4BillingPayment from './Step4BillingPayment';
import Confirmation from './Confirmation';

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    accountHolder: {},
    services: {},
    billing: {},
    termsAccepted: false,
    recordId: null,
    clientId: ''
  });

  const handleNext = (data) => {
    console.log('Handling Next Step:', currentStep + 1, data);
    setFormData({ ...formData, ...data });
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div>
      {currentStep === 1 && <Step1TermsOfService onNext={handleNext} data={formData.termsAccepted} />}
      {currentStep === 2 && <Step2AccountHolderDetails onNext={handleNext} data={formData.accountHolder} termsAccepted={formData.termsAccepted} />}
      {currentStep === 3 && <Step3SelectService onNext={handleNext} onPrev={handlePrev} data={formData.services} recordId={formData.recordId} />}
      {currentStep === 4 && <Step4BillingPayment onNext={handleNext} onPrev={handlePrev} data={formData.billing} recordId={formData.recordId} />}
      {currentStep === 5 && <Confirmation formData={formData} />}
    </div>
  );
};

export default MultiStepForm;
