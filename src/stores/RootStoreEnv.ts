import { Auth } from "../lib/Auth";
import { TripRepository } from "../repositories/TripRepository";

export interface RootStoreEnv {
  auth: Auth;
  tripRepository: TripRepository;
}
