import { Request, Response } from "express";
import AwaitingRepair from "../models/AwaitingRepair";
import Service from "../models/Service";

const AwaitingRepairsController = {
  get_all: (req: Request, res: Response) => {
    AwaitingRepair.find({})
      .then((result: any) => {
        res.status(200).send(result);
      })
      .catch(() => {
        res.status(404).json({ message: "Brak oczekujących zleceń" });
      });
  },

  get_single: (req: Request, res: Response) => {
    const id = req.params.awaitingOrderId;
    AwaitingRepair.findById(id)
      .then((result: any) => {
        res.status(200).send(result);
      })
      .catch(() => {
        res.status(404).json({
          message: "Nie znaleziono oczekującego zlecenia o podanym numerze ID",
        });
      });
  },

  add_single: (req: Request, res: Response) => {
    const { customerInfo, carInfo, orderInfo } = req.body;
    const { repairType: repairName } = orderInfo;

    Service.findOne({ name: repairName })
      .then((repairType: any) => {
        if (repairType) {
          const repairTypeId = repairType.id;
          const awaitingRepair = new AwaitingRepair({
            customerInfo: {
              names: customerInfo.names,
              email: customerInfo.email,
              phone: customerInfo.phone,
            },

            carInfo: {
              productionYear: carInfo.productionYear,
              make: carInfo.make,
              model: carInfo.model,
              licencePlate: carInfo.licencePlate,
              paintCode: carInfo.paintCode,
            },

            orderInfo: {
              service: repairTypeId,
              comment: orderInfo.comment,
            },
          });

          awaitingRepair
            .save()
            .then((result) => {
              res.status(201).json({
                message: "Zlecenie przyjęte do oczekujących.",
                info: result,
              });
            })
            .catch((error) => res.status(500).json({ message: error }));
        } else {
          throw Error("Zlecenie nieprzyjęte");
        }
      })
      .catch((error: Error) => res.status(500).json({ message: error }));
  },

  modify_single: (req: Request, res: Response) => {
    const id = req.params.awaitingOrderId;
    const { customerInfo, carInfo, orderInfo } = req.body;

    AwaitingRepair.findByIdAndUpdate(
      id,
      {
        customerInfo: {
          firstName: customerInfo.firstName,
          lastName: customerInfo.lastName,
          email: customerInfo.email,
          telephone: customerInfo.telephone,
        },

        carInfo: {
          productionYear: carInfo.productionYear,
          model: carInfo.model,
          licensePlate: carInfo.licensePlate,
          paintCode: carInfo.paintCode,
        },

        orderInfo: {
          serviceType: orderInfo.serviceType,
          comments: orderInfo.comments,
        },
      },
      { new: true }
    )
      .then((result: any) => {
        res.status(200).json({
          message: "Zmodyfikowano oczekujące zlecenie",
          info: result,
        });
      })
      .catch(() =>
        res
          .status(500)
          .json({ message: "Nie zmodyfikowano - wystąpił błąd serwera" })
      );
  },

  delete_single: (req: Request, res: Response) => {
    const id = req.params.awaitingOrderId;

    AwaitingRepair.findByIdAndRemove(id)
      .then(() => {
        res.status(200).json({ message: "Usunięto oczekujące zlecenie" });
      })
      .catch(() => {
        res.status(500).json({ message: "Nie usunięto - błąd serwera" });
      });
  },
};

export default AwaitingRepairsController;
