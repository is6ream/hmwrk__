import { error } from 'console';
import { dataset1 } from './../../../../__tests__/helpers/datasets';
export async function createDriverHandler(
    req: Request,
    res: Response
) {
    try {
        const createdDriverId = await.driversservice.create(
            req.body.data.attributes,
        );

        const createdDriver = await driversService.findById(createdDriverId);
        const driverOutput = mapToDriverOutput(createdDriver);

        res.status(HttpStatus.Created).send(driverOutput);
    } catch (e: unknown) {
        errorsHandler(e, res)
    }

} //остановился на разборе хендлера