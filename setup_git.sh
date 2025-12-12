#!/bin/bash

# المرحلة الأولى: إعداد Git للمشروع
echo "--- بدأت المرحلة الأولى: تهيئة Git ---"

# 1. إنشاء ملف .gitignore لحماية الملفات الحساسة والضخمة
echo "1. إنشاء ملف .gitignore..."
cat <<EOT > .gitignore
node_modules/
src/database/exam_local.db
uploads/
.env
EOT

# 2. تهيئة مستودع Git محلي
if [ -d ".git" ]; then
    echo "مستودع Git موجود مسبقاً."
else
    echo "2. تهيئة Git init..."
    git init
fi

# 3. إضافة الملفات إلى المرحلة الانتقالية (Staging)
echo "3. إضافة الملفات (git add)..."
git add .

# 4. تسجيل أول لقطة للكود (Commit)
echo "4. تسجيل التغييرات (Commit)..."
git commit -m "إعداد هيكلة الباك اند والجداول الأساسية"

echo "--- تمت المرحلة الأولى بنجاح! ---"
echo "الآن يمكنك ربط المشروع بـ GitHub باستخدام git remote add."
