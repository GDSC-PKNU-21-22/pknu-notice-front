import MajorModal from '@components/Modal/MajorModal';
import useMajor from '@hooks/useMajor';
import useRoter from '@hooks/useRouter';
import React, { useEffect, useState } from 'react';

interface MajorLayoutProps {
  children: React.ReactNode;
}

const MajorLayout = ({ children }: MajorLayoutProps) => {
  const { major } = useMajor();
  const { routerTo, goBack } = useRoter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);

  if (!major && isModalOpen) {
    return (
      <MajorModal
        onClose={() => setIsModalOpen((prev) => !prev)}
        routerTo={() => routerTo('/major-decision')}
      />
    );
  }
  if (!major && !isModalOpen) {
    goBack();
    return <></>;
  }

  return <>{children}</>;
};

export default MajorLayout;
