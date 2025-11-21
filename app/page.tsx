import { Card } from '@/components/ui/card'
import Navbar from './Components/Navbar'
import StatsCard from './Components/StatsCard'
import TableArea from './Components/TableArea.tsx/TableArea';

export default function page() {
  return (
    <div className='m-5'>
      <Card>
       <Navbar />
       <StatsCard />
       <TableArea />
      </Card>
    </div>
  );
}