script='bible.pl'
#script='duranno.pl'

for i in {1..3}
do
	for j in {1..150}
	do
		filename="E.${i}.${j}"
		perl $script NIV $i $j > $filename
		#filename="J.${i}.${j}"
		#perl nocr.pl $i $j > $filename
		filename="F.${i}.${j}"
		perl nocr2.pl $i $j > $filename
		#filename="K3.${i}.${j}"
		#perl godpia.pl $i $j > $filename
		if [ ! -s $filename ]
		then
			rm $filename
			break
		else
			echo "$i $j"
			#filename="K.${i}.${j}"
			#perl bible.pl GAE $i $j > $filename
		fi
	done
done
