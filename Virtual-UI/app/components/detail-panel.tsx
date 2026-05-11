import { Icomponent } from '@/models/component.model';
import React from 'react'

interface DetailPanelProps {
    component : Icomponent | null;
    onBack : () => void;
}
const DetailPanel = ({component, onBack}: DetailPanelProps ) => {
  return (
    <div>
      
    </div>
  )
}

export default DetailPanel
