
all:
	tsc --jsx react -m amd src/sparkbars.tsx --outDir build

clean:
	$(RM) build