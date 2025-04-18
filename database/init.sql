-- ステータス用のENUM型を作成
CREATE TYPE todo_status AS ENUM ('PENDING', 'COMPLETED');

-- TODOテーブルの作成
CREATE TABLE todo (
  id SERIAL PRIMARY KEY,
  title VARCHAR(32) NOT NULL,
  contents VARCHAR(256),
  status todo_status NOT NULL DEFAULT 'PENDING',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 更新日時を自動更新するためのトリガー関数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = CURRENT_TIMESTAMP;
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- トリガーの作成
CREATE TRIGGER trigger_update_timestamp
BEFORE UPDATE ON todo
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
