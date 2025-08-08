import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import * as zod from "zod";

import { HandPalmIcon, PlayIcon } from "@phosphor-icons/react";
import { Countdown } from "./components/Countdown";
import { NewCycleForm } from "./components/NewCycleForm";

import { useContext } from "react";
import { CyclesContext } from "../../contexts/CyclesContext";
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from "./styles";

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  minutesAmount: zod
    .number()
    .min(1, "O ciclo precisa ser no mínimo de 5 minutos")
    .max(60, "O ciclo precisa ser de no máximo 60 minutos"),
});

type newCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export function Home() {
  const { activeCycle, createNewCycle, interruptCurrentCycle } =
    useContext(CyclesContext);

  const newCycleForm = useForm<newCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 5,
    },
  });

  const { handleSubmit, watch, reset } = newCycleForm;

  function handleCreateNewCycle(data: newCycleFormData) {
    createNewCycle(data);
    reset();
  }

  const task = watch("task");
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>

        <Countdown />

        {activeCycle ? (
          <StopCountdownButton onClick={interruptCurrentCycle} type="button">
            Interromper <HandPalmIcon size={24} />
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisabled} type="submit">
            Começar <PlayIcon size={24} />
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  );
}
