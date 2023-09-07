import React, { useState, useEffect } from 'react';

interface ProgressBarProps {
  percentage: number;
  label: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage, label }) => {
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    setWidth(percentage);
  }, [percentage]);

  return (
    <div className="ProgressContainer">
      <div className="ProgressBar" style={{ width: `${width}%` }}>        
      </div>
      <div className="ProgressLabel">{label}</div>
    </div>
  );
}

export default ProgressBar;
