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
  mileage: number;

  // transform obj is the Report Entity
  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;
}
