"use client"

interface AlertModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    loading: boolean;
}

import React, { useEffect, useState } from 'react'
import { Modal } from '../ui/modal';
import { Button } from '../ui/button';

export const AlertModal: React.FC<AlertModalProps> = ({
    isOpen, onClose, onConfirm, loading
}) => {

    const [isMounted, setIsMounted] = useState(false);

    useEffect(()=>{
        setIsMounted(true)
    }, []);

    if(!isMounted){
        return null;
    }

  return (
   <Modal
      title='Are you sure'
      description='This action cannot be undone'
      isOpen={isOpen}
      onClose={onClose}
   >
    <div className='flex items-center justify-end w-full pt-6 space-x-2'>
        <Button
            disabled={loading}
            variant="outline"
            onClick={onClose}
        >
            Cancel
        </Button>
        <Button
            disabled={loading}
            variant="destructive"
            onClick={onConfirm}
        >
            Continue
        </Button>
    </div>
   </Modal>
  )
}




