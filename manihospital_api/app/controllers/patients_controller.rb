class PatientsController < ApplicationController
  skip_before_action :verify_authenticity_token

  # GET /patients
  def index
    patients = Patient.all
    render json: patients
  end

  # GET /patients/:id   <-- YOU WERE MISSING THIS
  def show
    patient = Patient.find(params[:id])
    render json: patient
  end

  # POST /patients
  def create
    patient = Patient.new(patient_params)

    if patient.save
      render json: patient, status: :created
    else
      render json: { error: patient.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PUT /patients/:id
  def update
    patient = Patient.find(params[:id])

    if patient.update(patient_params)
      render json: patient, status: :ok
    else
      render json: { error: patient.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /patients/:id
  def destroy
    patient = Patient.find(params[:id])
    patient.destroy
    render json: { message: "Patient deleted" }, status: :ok
  end

  private

  def patient_params
    params.require(:patient).permit(:name, :age, :condition, :doctor, :room, :status)
  end
end
