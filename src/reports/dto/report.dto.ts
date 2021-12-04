import { Expose, Transform } from 'class-transformer';

// outgoing dto
export class ReportDto {
  @Expose()
  id: number;
  @Expose()
  price: number;
  @Expose()
  year: number;
  @Expose()
  lng: number;
  @Expose()
  lat: number;
  @Expose()
  make: string;
  @Expose()
  model: string;
  @Expose()
  mileage: number;
  @Expose()
  approved: boolean;

  // transform obj is the Report Entity
  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;
}
