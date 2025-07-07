'use client';

import { FC } from 'react';
import ServiceTemplate from '@/components/shared/ServiceTemplate/ServiceTemplate';
import { servicesData } from '@/lib/data/services';

const CompressionBootsPage: FC = () => {
  return <ServiceTemplate data={servicesData['compression-boots']} />;
};

export default CompressionBootsPage;
