import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import * as Components from "../../RegisterComponents";
import { DataDiNascita, Select } from "../../RegisterComponents";

const Step2 = React.memo(
  ({
    deadlineDate,
    setDeadlineDate,
    nome,
    setNome,
    cognome,
    setCognome,
    telefono,
    setTelefono,
    erroreNome,
    erroreCognome,
    erroreData,
    erroreTelefono,
    pronomi,
    setPronomi,
  }) => (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Components.Form>
          <label htmlFor="name">Nome</label>
          <Components.Input
            type="name"
            placeholder="es. Mario"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            error={erroreNome}
            required
          />
          <label htmlFor="name">Cognome</label>
          <Components.Input
            type="name"
            placeholder="es. Rossi"
            value={cognome}
            onChange={(e) => setCognome(e.target.value)}
            error={erroreCognome}
            required
          />
          <label htmlFor="pronouns">Pronomi</label>
          <Select
            name="pronouns"
            id="pronouns"
            defaultValue={pronomi}
            onChange={(e) => setPronomi(e.target.value)}
            required
          >
            <option value="" selected disabled hidden>
              Seleziona
            </option>
            <option value="he_him">he/him</option>
            <option value="she_her">she/her</option>
            <option value="they_them">they/them</option>
            <option value="altro">altro</option>
          </Select>
          <label htmlFor="name">Data di nascita</label>
          <DataDiNascita
            id="datePicker"
            placeholder="Data di nascita"
            value={deadlineDate}
            onChange={(dates) => setDeadlineDate(dates[0])}
            options={{
              maxDate: new Date(),
              minDate: new Date("1900-01-01"),
              dateFormat: "M d, Y",
            }}
            error={erroreData}
          />
          <label>Telefono</label>
          <Components.Input
            type="telefono"
            placeholder="es. 1234567890"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value.split(" ").join(""))}
            error={erroreTelefono}
            required
          />
        </Components.Form>
      </LocalizationProvider>
    </>
  ),
);

export default Step2;
