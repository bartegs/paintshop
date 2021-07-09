import * as React from "react";
import useWindowWidth from "../../hooks/useWindowWidth";

import { Input } from "../../components/Input/Input";

export function NewRepair(): JSX.Element {
  const { width } = useWindowWidth();
  const [contact, setContact] = React.useState({
    names: "",
    email: "",
    phone: "",
    year: "",
    make: "",
    model: "",
    plate: "",
    paint: "",
    repairType: "Naprawa",
    description: "",
    privacy: false,
  });

  function handleValueChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = event.currentTarget;

    if (name === "names") {
      setContact(() => ({
        ...contact,
        names: value,
      }));
    } else if (name === "email") {
      setContact(() => ({
        ...contact,
        email: value,
      }));
    } else if (name === "phone") {
      setContact(() => ({
        ...contact,
        phone: value,
      }));
    } else if (name === "model") {
      setContact(() => ({
        ...contact,
        model: value,
      }));
    } else if (name === "plate") {
      setContact(() => ({
        ...contact,
        plate: value,
      }));
    } else if (name === "paint") {
      setContact(() => ({
        ...contact,
        paint: value,
      }));
    } else if (name === "repairType") {
      setContact(() => ({
        ...contact,
        repairType: value,
      }));
    }
  }

  function handleTextAreaChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const { value, name } = event.currentTarget;
    if (name === "description") {
      setContact(() => ({
        ...contact,
        description: value,
      }));
    }
  }

  function handleCheckboxChange() {
    setContact(() => ({
      ...contact,
      privacy: !contact.privacy,
    }));
  }

  function handleSelectChange(event: React.FormEvent<HTMLSelectElement>) {
    const { name } = event.currentTarget;
    const element = event.currentTarget as HTMLSelectElement;
    if (name === "year") {
      setContact(() => ({
        ...contact,
        year: element.value,
      }));
    } else if (name === "make") {
      setContact(() => ({
        ...contact,
        make: element.value,
      }));
    }
  }

  return (
    <div className=" new-repair container">
      <div className="new-repair__calculator">
        <h2 className="new-repair__heading">
          Wylicz szacunkowy koszt naprawy {width >= 768 && <br />}
          za pomocą naszego kalkulatora
        </h2>
        {/* <form className="new-repair__calculator__form">
          <Input
            placeholder="Podaj numer zlecenia"
            name="repair-number"
            value={value}
            onChange={handleValueChange}
            additionalClasses="mt-3 mb-5"
          />
          <Input
            placeholder="Podaj numer zlecenia"
            name="repair-number"
            value={value}
            onChange={handleValueChange}
            additionalClasses="mt-3 mb-5"
          />
          <Input
            placeholder="Podaj numer zlecenia"
            name="repair-number"
            value={value}
            onChange={handleValueChange}
            additionalClasses="mt-3 mb-5"
          />
        </form> */}
      </div>
      <div className="new-repair__line" />
      <div className="new-repair__contact">
        <h2 className="new-repair__heading">
          Lub po prostu zostaw nam dane o {width >= 768 && <br />}
          zleceniu, a my zajmiemy się resztą!
        </h2>
        <form className="new-repair__contact__form">
          <label htmlFor="names" className="input--outlined__label">
            imie i nazwisko*
          </label>
          <Input
            placeholder="Wpisz swoje imię i nazwisko"
            name="names"
            id="names"
            value={contact.names}
            onChange={handleValueChange}
            additionalClasses="input--outlined"
            type="text"
          />
          <label htmlFor="email" className="input--outlined__label">
            email*
          </label>
          <Input
            placeholder="Wpisz swój adres email"
            name="email"
            id="email"
            value={contact.email}
            onChange={handleValueChange}
            additionalClasses="input--outlined"
            type="email"
          />
          {/* {contact.email} */}
          <label htmlFor="phone" className="input--outlined__label">
            telefon*
          </label>
          <Input
            placeholder="Wpisz swój numer telefonu"
            name="phone"
            id="phone"
            value={contact.phone}
            onChange={handleValueChange}
            additionalClasses="input--outlined"
            type="text"
          />
          {/* {contact.phone} */}
          <label
            htmlFor="year"
            className="input--outlined__label input--outlined__label--other"
          >
            rocznik*
          </label>
          <select
            name="year"
            id="year"
            value={contact.year}
            onChange={handleSelectChange}
            className="input--outlined"
          >
            <option value="wybierz">Wybierz rocznik auta</option>
            <option value="1999">1999</option>
            <option value="2000">2000</option>
            <option value="2001">2001</option>
            <option value="2002">2002</option>
          </select>
          {/* {contact.year} */}
          <label
            htmlFor="make"
            className="input--outlined__label  input--outlined__label--other"
          >
            marka*
          </label>
          <select
            name="make"
            id="make"
            value={contact.make}
            onChange={handleSelectChange}
            className="input--outlined"
          >
            <option value="wybierz">Wybierz markę auta</option>
            <option value="audi">Audi</option>
            <option value="bmw">BMW</option>
            <option value="mercedes">Mercedes</option>
            <option value="volvo">Volvo</option>
          </select>
          {/* {contact.make} */}
          <label htmlFor="model" className="input--outlined__label">
            model*
          </label>
          <Input
            placeholder="Wpisz model auta"
            name="model"
            id="model"
            value={contact.model}
            onChange={handleValueChange}
            additionalClasses="input--outlined"
            type="text"
          />
          {/* {contact.model} */}
          <label htmlFor="plate" className="input--outlined__label">
            rejestracja*
          </label>
          <Input
            placeholder="Wpisz numer rejestracyjny auta"
            name="plate"
            id="plate"
            value={contact.plate}
            onChange={handleValueChange}
            additionalClasses="input--outlined"
            type="text"
          />
          {/* {contact.plate} */}
          <label htmlFor="paint" className="input--outlined__label">
            kod lakieru*
          </label>
          <Input
            placeholder="Wpisz kod lakieru auta"
            name="paint"
            id="paint"
            value={contact.paint}
            onChange={handleValueChange}
            additionalClasses="input--outlined"
            type="text"
          />
          {/* {contact.paint} */}
          <label
            htmlFor="repairType"
            className="input--outlined__label input--outlined__label--other"
          >
            Usługa*
          </label>
          <div id="repairType" className="radio-container input--outlined">
            <Input
              name="repairType"
              value="Naprawa"
              checked={contact.repairType === "Naprawa"}
              onChange={handleValueChange}
              type="radio"
            />
            Naprawa
            <Input
              name="repairType"
              value="Lakierowanie"
              checked={contact.repairType === "Lakierowanie"}
              onChange={handleValueChange}
              type="radio"
            />
            Lakierowanie
            <Input
              name="repairType"
              value="Detailing"
              checked={contact.repairType === "Detailing"}
              onChange={handleValueChange}
              type="radio"
            />
            Detailing
            {/* {contact.repairType} */}
          </div>
          <label
            htmlFor="description"
            className="input--outlined__label  input--outlined__label--other"
          >
            Usługa*
          </label>
          <textarea
            name="description"
            id="description"
            className="input--outlined text-area"
            placeholder="Opisz swoje zlecenie i podziel się swoimi uwagami."
            value={contact.description}
            onChange={handleTextAreaChange}
          />
          Zapoznałem/am się z
          <a href="https://policies.google.com/privacy?hl=en-US">
            &nbsp;Polityką Prywatności&nbsp;
          </a>
          i wyrażam zgodę na przetwarzanie danych osobowych
          <input
            name="privacy"
            type="checkbox"
            checked={contact.privacy}
            onChange={handleCheckboxChange}
          />
          {/* {contact.privacy.toString()} */}
        </form>
      </div>
    </div>
  );
}
