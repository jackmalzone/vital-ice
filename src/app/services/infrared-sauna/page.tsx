'use client';

import { FC } from 'react';
import ServiceTemplate from '@/components/shared/ServiceTemplate/ServiceTemplate';
import { servicesData } from '@/lib/data/services';

const InfraredSaunaPage: FC = () => {
  return <ServiceTemplate data={servicesData['infrared-sauna']} />;
};

export default InfraredSaunaPage;
