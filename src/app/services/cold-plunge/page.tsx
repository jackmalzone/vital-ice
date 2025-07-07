'use client';

import { FC } from 'react';
import ServiceTemplate from '@/components/shared/ServiceTemplate/ServiceTemplate';
import { servicesData } from '@/lib/data/services';

const ColdPlungePage: FC = () => {
  return <ServiceTemplate data={servicesData['cold-plunge']} />;
};

export default ColdPlungePage; 