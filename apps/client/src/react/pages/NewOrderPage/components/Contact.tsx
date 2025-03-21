import * as React from "react";
import classnames from "classnames";
import { useHistory } from "react-router-dom";
import useWindowWidth from "../../../hooks/useWindowWidth";
import { host } from "../../../../../../common/utils/contants";

import { InputOutlined } from "../../../../../../common/react/components/InputOutlined";
import {
  Select,
  Radio,
  TextArea,
  File,
  Checkbox,
} from "../../../components/forms/components";
import { Button } from "../../../../../../common/react/components";
import type { Color } from "../../../../../../common/utils/types";
import { getYearData } from "../utils";
import type { MakesDataType } from "../utils";

export interface ContactProps {
  names: string;
  email: string;
  phone: string;
  model: string;
  licencePlate: string;
  paintCode: string;
  comment: string;
  privacy: boolean;
  serviceName: string;
  year: string;
  make: string;
  files: Blob & { name: string };
  setNames: React.Dispatch<React.SetStateAction<string>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPhone: React.Dispatch<React.SetStateAction<string>>;
  setYear: React.Dispatch<React.SetStateAction<string>>;
  setMake: React.Dispatch<React.SetStateAction<string>>;
  setModel: React.Dispatch<React.SetStateAction<string>>;
  setLicencePlate: React.Dispatch<React.SetStateAction<string>>;
  setPaintCode: React.Dispatch<React.SetStateAction<string>>;
  setServiceName: React.Dispatch<React.SetStateAction<string>>;
  setComment: React.Dispatch<React.SetStateAction<string>>;
  setPrivacy: React.Dispatch<React.SetStateAction<boolean>>;
  setFiles: React.Dispatch<React.SetStateAction<Blob>>;
  makesData: MakesDataType;
}

type OwnProps = ContactProps & {
  color: Color;
};

const Contact = React.forwardRef<HTMLInputElement, OwnProps>(
  (
    {
      files,
      color,
      names,
      email,
      phone,
      model,
      licencePlate,
      paintCode,
      comment,
      privacy,
      serviceName,
      year,
      make,
      setNames,
      setEmail,
      setPhone,
      setYear,
      setMake,
      setModel,
      setLicencePlate,
      setPaintCode,
      setServiceName,
      setComment,
      setPrivacy,
      setFiles,
      makesData,
    }: OwnProps,
    ref
  ) => {
    const { width } = useWindowWidth();
    const { push } = useHistory();

    function handleContactReset() {
      setNames("");
      setEmail("");
      setPhone("");
      setYear("");
      setMake("");
      setModel("");
      setLicencePlate("");
      setPaintCode("");
      setServiceName("Naprawa");
      setComment("");
      setPrivacy(false);
    }

    const servicesData = [
      { id: "Naprawa ", value: "Naprawa" },
      { id: "Lakierowanie ", value: "Lakierowanie", additionalClasses: "my-2" },
      { id: "Detailing ", value: "Detailing" },
    ];

    function handleSubmit(event: React.FormEvent) {
      event.preventDefault();

      const fd = new FormData();

      if (files) {
        fd.append("image", files, files.name);
      }

      const formValues = [
        { key: "color", value: color },
        { key: "names", value: names },
        { key: "email", value: email },
        { key: "phone", value: phone },
        { key: "model", value: model },
        { key: "licencePlate", value: licencePlate },
        { key: "paintCode", value: paintCode },
        { key: "comment", value: comment },
        { key: "serviceName", value: serviceName },
        { key: "productionYear", value: year },
        { key: "make", value: make },
      ];

      formValues.forEach(({ key, value }) => {
        fd.append(key, value);
      });

      fetch(`${host}/awaiting-orders`, {
        method: "POST",
        body: fd,
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.log(error));

      push("/podziekowania");
    }

    return (
      <section className="new-order-page__section">
        <h2
          className={classnames("new-order-page__heading", {
            "mt-10": width < 1366,
          })}
        >
          Lub po prostu zostaw nam dane o {width >= 768 && <br />}
          zleceniu, a my zajmiemy się resztą!
        </h2>
        <form className="new-order-page__form" onSubmit={handleSubmit}>
          <InputOutlined
            placeholder="Wpisz swoje imię i nazwisko"
            labelText="IMIE I NAZWISKO*"
            color={color}
            additionalClasses="mt-4"
            name="names"
            id="names"
            value={names}
            setState={setNames}
            fontTheme="dark"
            required
            ref={ref}
          />
          <InputOutlined
            placeholder="Wpisz swój adres email"
            labelText="EMAIL*"
            additionalClasses="mt-4"
            color={color}
            name="email"
            id="email"
            value={email}
            setState={setEmail}
            fontTheme="dark"
            required
          />
          <InputOutlined
            placeholder="Wpisz swój numer telefonu"
            labelText="TELEFON*"
            additionalClasses="mt-4"
            color={color}
            name="phone"
            id="phone"
            value={phone}
            setState={setPhone}
            fontTheme="dark"
            required
          />
          <Select
            labelText="ROCZNIK*"
            color={color}
            selectName="yearContact"
            id="year"
            value={year}
            setState={setYear}
            required
            optionsData={getYearData(100)}
          />
          <Select
            labelText="MARKA*"
            color={color}
            selectName="makeContact"
            id="make"
            value={make}
            setState={setMake}
            required
            optionsData={makesData}
          />
          <InputOutlined
            labelText="MODEL*"
            color={color}
            additionalClasses="mt-4"
            placeholder="Wpisz model auta"
            name="model"
            id="model"
            value={model}
            setState={setModel}
            fontTheme="dark"
            required
          />
          <InputOutlined
            labelText="REJESTRACJA*"
            color={color}
            additionalClasses="mt-4"
            placeholder="Wpisz numer rejestracyjny auta"
            name="plate"
            id="plate"
            value={licencePlate}
            setState={setLicencePlate}
            fontTheme="dark"
            required
          />
          <InputOutlined
            hasTooltip
            tooltipText="Podaj kod lakieru auta. Zazwyczaj znajdziesz go na naklejce na przednim błotniku
              oraz na naklejce we wnęce koła zapasowego. Prosimy o to, żeby przyśpieszyć realizację zlecenia,
              bo jeśli nie mamy akurat dostępu do tego lakieru, to sprowadzimy go za wczasu,
              aby czas oczekiwania na auto był jak najkrótszy!
              Jeśli nie masz do tego kodu dostępu, nic się nie stało, poradzimy sobie."
            labelText="KOD LAKIERU"
            color={color}
            additionalClasses="mt-4"
            placeholder="Wpisz kod lakieru auta"
            name="paint"
            id="paint"
            value={paintCode}
            setState={setPaintCode}
            fontTheme="dark"
          />
          <Radio
            name="orderType"
            id="orderType"
            labelText="USŁUGA*"
            value={serviceName}
            setState={setServiceName}
            radioData={servicesData}
            color={color}
          />
          <TextArea
            labelText="OPIS ZLECENIA"
            name="description"
            id="description"
            value={comment}
            placeholder="Opisz swoje zlecenie i podziel się swoimi uwagami."
            setState={setComment}
            color={color}
            variant="outlined"
            additionalClasses="mb-3"
          />
          <File
            name="photo"
            id="photo"
            labelAdditionalClasses="file__label--centered"
            fileAdditionalClasses="my-3"
            setState={setFiles}
          />
          <Checkbox
            name="privacy"
            id="privacy"
            isChecked={privacy}
            setState={setPrivacy}
            required
            color={color}
          />
          <div className="new-order-page__buttons">
            <Button
              text="Wyślij"
              color={color}
              type="submit"
              variant="primary"
              additionalClasses="mr-3 contact-submit-button"
              hasFixedWidth={false}
            />
            <Button
              text="Resetuj"
              color={color}
              type="reset"
              variant="secondary"
              onClick={handleContactReset}
              hasFixedWidth={false}
            />
          </div>
        </form>
      </section>
    );
  }
);

export { Contact };
