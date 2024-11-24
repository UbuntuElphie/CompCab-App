import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig'; // Ensure the correct path for firebaseConfig
import { doc, getDoc } from 'firebase/firestore';
import Step2AccountHolderDetails from './Step2AccountHolderDetails'; // Renaming to Step1
import Step3SelectService from './Step3SelectService';
import Step4BillingPayment from './Step4BillingPayment';
import Confirmation from './Confirmation';

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    accountHolder: {},
    services: {},
    billing: {},
    recordId: null, // Initialize as null until dynamically set
    clientId: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentStep === 3 && formData.recordId) {
      const fetchData = async () => {
        setLoading(true);
        const docRef = doc(db, 'accountHolders', formData.recordId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFormData(prevData => ({
            ...prevData,
            accountHolder: docSnap.data()
          }));
        } else {
          console.error("No such document!");
        }
        setLoading(false);
      };

      fetchData();
    }
  }, [currentStep, formData.recordId]);

  const handleNext = (data) => {
    console.log('Handling Next Step:', currentStep + 1, data);
    setFormData({ ...formData, ...data });
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {currentStep === 1 && <Step2AccountHolderDetails onNext={handleNext} data={formData.accountHolder} />} {/* Start with Step2 */}
      {currentStep === 2 && <Step3SelectService onNext={handleNext} onPrev={handlePrev} data={formData.services} recordId={formData.recordId} />}
      {currentStep === 3 && (
        <Step4BillingPayment 
          onNext={handleNext} 
          onPrev={handlePrev} 
          data={{ ...formData.billing, address: formData.accountHolder.address }} 
          recordId={formData.recordId} 
        />
      )}
      {currentStep === 4 && <Confirmation formData={formData} />}
    </div>
  );
};

export default MultiStepForm;
