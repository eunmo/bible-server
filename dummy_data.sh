for key in E F J K
do
  mkdir -p ./data/$key
  for i in {1..66}
  do
    for j in {1..150}
    do
      echo "[\"a.$key.$i.$j\", \"b.$key.$i.$j\", \"c.$key.$i.$j\"]" > ./data/$key/$i.$j
    done
  done
done
