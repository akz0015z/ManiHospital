class CreatePatients < ActiveRecord::Migration[8.1]
  def change
    create_table :patients do |t|
      t.string :name
      t.integer :age
      t.string :condition
      t.string :doctor
      t.string :room
      t.string :status

      t.timestamps
    end
  end
end
